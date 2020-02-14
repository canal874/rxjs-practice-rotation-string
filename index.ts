import { BehaviorSubject, interval } from 'rxjs';
import { take, map, scan, switchMap } from 'rxjs/operators';

// BehaviorSubject（inputSubj）を使って、別のObservable（rotationObs）へ入力（対象文字列、実行間隔）を与える

const inputSubj = new BehaviorSubject({ str: '宇宙よりも遠い場所', interval: 100 });
const rotationObs = inputSubj.pipe(
    switchMap(input => interval(input.interval).pipe(
      // 入力文字列をローテーション表示する
	    scan((state, count) => ({
	      arr: state.arr,
	      i: count % input.str.length
	    }), {
	      arr: input.str.split(''),
	      i: 0
	    }),
	    map(state => state.arr[state.i]),
      take(500) // 500文字出力したら終わる
    ))
);
const subscription = rotationObs.subscribe(
  o => document.body.innerHTML += o, 
);

// 3秒後に入力値を変更
setTimeout(()=>{
    inputSubj.next({ str: 'よりもい', interval: 10 });
}, 3000);
