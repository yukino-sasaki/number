
import React, { useState } from 'react'


/* セレクションでカラーを指定。色が変わるようにする？
配列のランダムでanswerの色を指定
数字とともにせんたくできるようにする
メッセージも追加 */

const colors = [
  { value: "red" },
  { value: "blue" },
  { value: "green" }
]


const random = (max) => {
  return Math.floor(Math.random() * Math.floor(max)) + 1;

}

/* const colorran = () => {
  
}
 */
var selection = colors[Math.floor(Math.random() * colors.length)];
console.log(selection.value)

/* 何をしているのかを明確にすること。出来れば紙に書き出してみること */

//onGuess={judge},子コンポーネント colorを親コンポーネントに渡したい

function Guess({ onGuess, colorful, texts, somecolor, func }) {
  const [val, setVal] = useState(0);
  /*  const [color, setColor] = useState('red') //selectの結果
   const [text, setText] = useState('') //色の判定を行ったときの表示されるやつ */
  const handleChange = e => setVal(e.target.value)
  //const handleColor = e => setColor(e.target.value)
  const handleClick = () => {
    onGuess(val * 1);// ここが何をしているのか.予想するのやつ
    console.log(func())
  }
  //console.log(color)
  /* const colorrender = () => {
    var colren = color;
    return colren;
  }
  
  var rendercolor = colorrender()
  console.log(rendercolor);
  //ここらへんで三項演算子の関数を作成し、handleclickに入れておく
  const func = () => {
    const sel = selection.value == rendercolor ? setText('色は合ってます！') : setText('色が違います！')

    return sel
  }
 */
  //colorを変更するとレンダリングが走るようで、関数にしたら解決したのですが、それをif文の条件の中に入れるとレンダリングのループになってしまいます。
  //どう実行すれば思い通りの挙動になるのでしょうか。三項演算子でいけた
  /* if (selection.value == rendercolor) {
    setText('色は合ってます！')
  } else {
    setText('色が違います！')
  }
 */


  return (
    <>

      <input
        type="number"/*?? "text"  numberによって上下の矢印が出てくる*/
        value={val}
        onChange={handleChange}
      /* {(e) =>{
        setAnswer(e.target.value)
      }} */
      />

      <select value={colorful}
        onChange={somecolor}>
        <option value="red">赤</option>
        <option value="blue">青</option>
        <option value="green">緑</option>
      </select>
      <p>色:{colorful}</p>
      <input
        type="button"
        value="予想する"
        onClick={
          handleClick

        }/* {replay} */
      />
      <div></div>
      <p>{texts}</p>
    </>
  )
}
// 色はvalueの値で比較する？
//setcolor, settextを親おこぽーねんと二渡してそこで操作する。そうすること絵初期値のusestateがundfinedにならないはず
function NumberGuessing(colors) {
  const max = 50;
  const initialCount = 5
  const [answer, setAnswer] = useState(random(max)); //乱数生成
  const [count, setCount] = useState(initialCount);//挑戦回数
  const [color, setColor] = useState('red') //selectの結果
  const [text, setText] = useState('') //色の判定を行ったときの表示されるやつ
  const [message, setMessage] = useState('');
  console.log(colors)

  //const handleColor = e => setColor(e.target.value)

  const colorrender = () => {
    var colren = color;
    return colren;
  }

  var rendercolor = colorrender()
  console.log(rendercolor);
  //ここらへんで三項演算子の関数を作成し、handleclickに入れておく
  /* const func = () => {
    const sel = selection.value == rendercolor ? setText('色は合ってます！') : setText('色が違います！')

    return sel
  }
 */

  const judge = num => {
    var a = num - answer;
    console.log(a)
    console.log(selection)
    console.log(num)

    if (count === 0) return; //returnだけって何？？numになんでramdom?の値が入るのかもなんとなくわからない

    setCount(count - 1); //1ずつヘラ挑戦回数を減らしていく

    if (num === answer) {
      setMessage('数字が正解です！')
    }
    else if (count === 1) {
      setMessage('残念でした。正解は' + answer); //なんで挑戦回数が1の時にこの表示が出てくるのか謎
    } else if (a > 15 && a < 50) {
      setMessage('もっと小さいです.')
      console.log(a)
    } else if (a <= 15 && a > 0) {
      setMessage('あと少し小さいです')
    } else if (a > -50 && a < -15) {
      setMessage('もっと大きいです')
    } else if (a >= -15 && a < 0) {
      setMessage('もう少し大きいです')
    }



  }


  const replay = () => {
    setAnswer(random(max));
    setCount(initialCount);
    setMessage('');
    setText('')
    setColor('red')

  }

  //サイトを参考にして書いた部分
  /* playerRef = React.createRef(); */

  return (
    <>
      <Guess onGuess={judge} colorful={color}
        texts={text}
        somecolor={(e) => setColor(e.target.value)}/* ref={this.playerRef} */
        func={() => {
          const sel = selection.value == rendercolor ? setText('色は合ってます！') : setText('色が違います！')

          return sel
        }}
      />

      <p>{message}</p>
      <p>あと{count}回</p>
      <button onClick={/* () => { */
        replay
        /* this.playerRef.current.rep() */
     /*  } */}>はじめから</button>
    </>
  );
}
//いっそbuttonをプロップスで渡せればいけるんじゃ？？
export default NumberGuessing;