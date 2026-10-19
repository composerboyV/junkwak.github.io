import importlib.util
from pathlib import Path
import tempfile
import subprocess
import unittest
spec=importlib.util.spec_from_file_location('export_activity',Path(__file__).parents[1]/'scripts/export_activity.py')
module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)

class ActivityTest(unittest.TestCase):
 def test_private_text_and_authors_cannot_enter_public_output(self):
  raw='a\x002026-10-18T18:00:00Z\x00fix: patient SECRET_NAME /private/file.py\x1e\nb\x002026-10-19T03:00:00Z\x00docs: internal credentials\x1e'
  result=module.summarize(raw,'hackathon','2026-10-19T08:00:00Z','initial')
  self.assertEqual(result['days'][0]['date'],'2026-10-19')
  self.assertEqual(result['days'][0]['commits'],2)
  self.assertEqual(result['syncMode'],'initial-snapshot')
  for word in ['patient','SECRET_NAME','/private','credentials']:self.assertNotIn(word,str(result))
 def test_duplicate_and_unrecognized_messages(self):
  row='a\x002026-10-19T03:00:00Z\x00unknown: fix failure\x1e'
  result=module.summarize(row+row,'hackathon','2026-10-19T08:00:00Z','actions')
  self.assertEqual(result['totalCommits'],1)
  self.assertEqual(result['days'][0]['categories'][0]['type'],'other')
 def test_successful_push_is_required_for_remote_checkout_export(self):
  # Export only committed HEAD; local edits and untracked files never contribute.
  with tempfile.TemporaryDirectory() as root:
   repo=Path(root)/'source';repo.mkdir();out=Path(root)/'public.json'
   def git(*args):return subprocess.check_output(['git','-C',str(repo),*args],stderr=subprocess.DEVNULL)
   git('init');git('config','user.name','Test');git('config','user.email','test@example.invalid')
   (repo/'file.txt').write_text('one');git('add','.');git('commit','-m','feat: private information')
   self.assertTrue(module.export(repo,'hackathon',out))
   first=out.read_text();(repo/'file.txt').write_text('uncommitted');(repo/'private.txt').write_text('untracked')
   self.assertFalse(module.export(repo,'hackathon',out));self.assertEqual(out.read_text(),first)
   git('add','.');git('commit','-m','fix: private paths')
   self.assertTrue(module.export(repo,'hackathon',out,'actions'))
   self.assertIn('"totalCommits": 2',out.read_text())

if __name__=='__main__':unittest.main()
