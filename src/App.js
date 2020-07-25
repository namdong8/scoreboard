import React from 'react';
import './App.css';

const Header = () => (
  <header className='header'>
    <h1 className='h1'>Scroeboard</h1>
    <span className='stats'>Player: 1</span>
  </header>
);

//상속하면 부모가가진 클래스를 다 물려받아서 무거움. 되도록이면 메소드형식으로 써라.
class Counter extends React.Component {

  //부모 생성자 없이 호출
  state = { //클래스아래의 변수는 속성
    score: 0,
    name: 'ldk'
  }


  handleScore = (delta) => {
    this.setState((prevState) => ({score: prevState.score + delta})  );
  }

  incrementScore(){
    console.log( 'increment');
    this.setState((prevState) => ({score: prevState.score + 1})  );
  }
  //메소드, 클래스는 this가 꼭 들어감,
  render() {
    return(
      <div className="counter">
        <button className="counter-action decrement" onClick={()=>{this.handleScore(-1)}}> - </button>
        <span className='counter-score'>{this.state.score}</span>
        <button className="counter-action increment" onClick={()=>{this.handleScore(1)}}> + </button>
      </div>
    )
  }
}

const Player = (props) => {
  return (
    <div className="player">
      <span className="player-name">
        {/*3.자식 컴포넌트에서 props로 받은 콜백 펑션을 실행*/}
        <button className="remove-player" onClick={() => props.removePlayer(props.id)}> x </button>
        {/* 함수 선언문을 위해 애로우 펑션 사용 */}
        {props.name}
      </span>
      <Counter score={props.score}></Counter>
    </div>
  );
}

class App extends React.Component{
  state = {
    players: [
      {name: 'LDK', score: 30, id: 1},
      {name: 'HONG', score: 40, id: 2},
      {name: 'KIM', score: 50, id: 3},
      {name: 'PARK', score: 60, id: 4},
    ]
  }

  //props를 펑션타입으로 넘겨주면 부모 자식 통신 가능
  //1. 부모 컴포넌트에 콜백 펑션을 만듬
  handleRemovePlayer = id => {
    console.log('remove Player: ',id);
    // 삭제 로직
    this.setState(prevState => {
      //프레디케이트
      //immutable: 원본데이터가 불변 => 새로운 배열을 리턴 => (ex map(), filter())
      //새로운 배열을 해야 랜더링이 됨
      // [...] 스프레드 연산자 (배열의 요소들을 가져와서 펼침)

      // prevState는 state= {}의 Json 객체를 가르킴
      const players = [...prevState.players];
      //True 인 배열의 Index return
      const index = players.findIndex(player => player.id === id) //True or False
      players.splice(index, 1);
      return {players: players}
    })
  }

  render() {
    return (
      <div className="scoreboard">
        <Header></Header>
        {
          this.state.players.map(player =>
            <Player name={player.name} score={player.score} id={player.id} key={player.id}
              //2. 콜백 펑션을 자식에게 내려보낸다.
                    removePlayer={this.handleRemovePlayer}></Player>)
          //  handleRemovePlayer() 함수 호출이 아니라 handleRemovePlayer 함수자체를 내려 줘야아함
        }
      </div>
    );
  }
}

export default App;
