#!/usr/bin/env python3
"""One-time owner-authenticated setup; credentials never enter repository files."""
import json
from pathlib import Path
import subprocess
import tempfile

TARGET='composerboyV/junkwak.github.io'
SOURCE='composerboyV/42_hackathon'
TITLE='Portfolio auto-sync (42_hackathon)'
SECRET='PORTFOLIO_DEPLOY_KEY'

def gh(*args, data=None):
    return subprocess.check_output(['gh',*args],input=data,text=True)

def setup():
    if subprocess.run(['gh','auth','status'],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL).returncode:
        subprocess.run(['gh','auth','login','--hostname','github.com','--git-protocol','ssh','--web','--skip-ssh-key'],check=True)
    keys=json.loads(gh('api',f'repos/{TARGET}/keys'))
    secrets=json.loads(gh('secret','list','--repo',SOURCE,'--json','name'))
    existing=next((k for k in keys if k['title']==TITLE),None)
    has_secret=any(s['name']==SECRET for s in secrets)
    if existing and has_secret:
        print('기존 자동 연동 키를 사용합니다.')
    elif existing or has_secret:
        raise RuntimeError('연동 키와 Secret 중 하나만 등록되어 있습니다. 기존 설정을 먼저 확인해 주세요. 자동으로 덮어쓰지 않았습니다.')
    else:
        with tempfile.TemporaryDirectory(prefix='portfolio-sync-key-') as temp:
            key=Path(temp)/'id_ed25519'
            subprocess.run(['ssh-keygen','-t','ed25519','-N','','-C',TITLE,'-f',str(key)],check=True,stdout=subprocess.DEVNULL)
            payload=json.dumps({'title':TITLE,'key':key.with_suffix('.pub').read_text().strip(),'read_only':False})
            created=json.loads(gh('api','--method','POST',f'repos/{TARGET}/keys','--input','-',data=payload))
            try:
                gh('secret','set',SECRET,'--repo',SOURCE,data=key.read_text())
            except Exception:
                gh('api','--method','DELETE',f'repos/{TARGET}/keys/{created["id"]}')
                raise
        print('포트폴리오 전용 연동 키를 등록했습니다. 임시 키 파일은 제거했습니다.')
    gh('workflow','run','portfolio-sync.yml','--repo',SOURCE,'--ref','main')
    print('첫 자동 갱신을 실행했습니다.')
    print('이제 42_hackathon의 main에 push하면 공개용 요약이 포트폴리오로 전달됩니다.')
    print('실행 상태: https://github.com/composerboyV/42_hackathon/actions/workflows/portfolio-sync.yml')

if __name__=='__main__':
    setup()
