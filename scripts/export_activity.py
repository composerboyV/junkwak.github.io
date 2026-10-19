#!/usr/bin/env python3
"""Export only allowlisted aggregate metadata; never publish commit messages or paths."""
import argparse
from collections import Counter, defaultdict
import datetime as dt
import json
from pathlib import Path
import re
import subprocess
from zoneinfo import ZoneInfo

PROJECTS = {'hackathon': {'name':'42 Global 해커톤','repository':'composerboyV/42_hackathon'}}
LABELS = {'feat':'기능 개발','fix':'오류 수정','docs':'문서 정리','test':'테스트 작업','refactor':'구조 개선','ci':'자동화 설정','chore':'개발 환경 정리','other':'기타 변경'}

def category(subject):
    match = re.match(r'^(feat|fix|docs|test|refactor|ci|chore)(?:\([^)]*\))?!?:', subject, re.I)
    return match[1].lower() if match else 'other'

def summarize(raw, project, exported_at, trigger):
    groups=defaultdict(Counter)
    latest=None
    seen=set()
    for record in raw.split('\x1e'):
        fields=record.strip('\n').split('\x00',2)
        if len(fields)!=3: continue
        sha, stamp, subject=fields
        if sha in seen: continue
        seen.add(sha)
        when=dt.datetime.fromisoformat(stamp).astimezone(ZoneInfo('Asia/Seoul'))
        latest=max(latest,when) if latest else when
        groups[when.date().isoformat()][category(subject)]+=1
    days=[]
    for day, counts in sorted(groups.items(),reverse=True):
        kinds=[{'type':key,'label':LABELS[key],'count':counts[key]} for key in LABELS if counts[key]]
        days.append({'date':day,'commits':sum(counts.values()),'categories':kinds,
          'summary':' · '.join(f'{k["label"]} {k["count"]}건' for k in kinds)})
    return {'version':1,'projectId':project,**PROJECTS[project], 'branch':'main',
      'latestCommitAt':latest.isoformat() if latest else None,'syncedAt':exported_at,
      'syncMode':'github-actions' if trigger=='actions' else 'initial-snapshot',
      'days':days,'totalCommits':sum(x['commits'] for x in days),
      'basis':'main 브랜치의 최근 90일 커미터 날짜(KST), 병합 커밋 제외. 저장소 기여자 전체 기록이며 실제 작업일·개인 기여량·검증 결과를 뜻하지 않습니다.'}

def export(source, project, output, trigger='initial'):
    now=dt.datetime.now(dt.timezone.utc)
    since=(now-dt.timedelta(days=90)).isoformat()
    raw=subprocess.check_output(['git','-C',str(source),'log','--no-merges','--since='+since,'--format=%H%x00%cI%x00%s%x1e','HEAD'],text=True)
    payload=summarize(raw,project,now.isoformat(),trigger)
    output=Path(output)
    if output.exists():
        previous=json.loads(output.read_text())
        a={k:v for k,v in previous.items() if k!='syncedAt'}
        b={k:v for k,v in payload.items() if k!='syncedAt'}
        if a==b: return False
    output.parent.mkdir(parents=True,exist_ok=True)
    output.write_text(json.dumps(payload,ensure_ascii=False,indent=2)+'\n')
    return True

if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--source',required=True,type=Path)
    parser.add_argument('--project',required=True,choices=PROJECTS)
    parser.add_argument('--output',required=True,type=Path)
    parser.add_argument('--trigger',choices=['initial','actions'],default='initial')
    args=parser.parse_args()
    print('Public summary updated.' if export(args.source,args.project,args.output,args.trigger) else 'Public summary unchanged.')
