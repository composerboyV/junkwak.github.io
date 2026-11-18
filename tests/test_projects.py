import json
from pathlib import Path
import re
import unittest

ROOT = Path(__file__).parents[1]


def load_projects():
    source = (ROOT / 'projects.js').read_text(encoding='utf-8')
    return json.loads(source[source.index('['):source.rindex(']') + 1])


class ProjectsTest(unittest.TestCase):
    """Homepage cards come from projects.js, grouped by app.js; keep both in step with the pages."""

    def setUp(self):
        self.projects = load_projects()

    def test_every_category_has_a_homepage_group(self):
        groups = re.findall(r"\{ id: '([a-z]+)', title:", (ROOT / 'app.js').read_text(encoding='utf-8'))
        self.assertTrue(groups)
        for project in self.projects:
            self.assertIn(project['category'], groups, project['id'])

    def test_ids_are_unique_and_do_not_shadow_homepage_sections(self):
        ids = [project['id'] for project in self.projects]
        self.assertEqual(len(ids), len(set(ids)))
        sections = set(re.findall(r'<section id="([^"]+)"', (ROOT / 'index.html').read_text(encoding='utf-8')))
        self.assertFalse(sections & set(ids))

    def test_detail_pages_exist_and_link_back_to_their_card(self):
        for project in self.projects:
            page = ROOT / 'projects' / project['id'] / 'index.html'
            self.assertEqual(project['url'], f"./projects/{project['id']}/")
            backs = re.findall(r'<a class="back-link" href="([^"]+)"', page.read_text(encoding='utf-8'))
            self.assertTrue(backs, project['id'])
            self.assertEqual(set(backs), {f"../../#{project['id']}"}, project['id'])


if __name__ == '__main__':
    unittest.main()
