const 정답 = "APPLE";

// 칸이 넘어가야 한다.
let index = 0;
let attempts = 0;
let timer;

function appStart() {
  //로직들
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    // CSS 코드 그대로 넣으면 됨
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:30vh; left:40vw; width:200px; height:100px; background-color:white;";
    // <body>에 넣자.
    document.body.appendChild(div);
  };
  const gameover = () => {
    // 더이상 입력이 되면 안 됨
    // 이벤트 지우개
    window.removeEventListener("keydown", handlekeydown);
    displayGameover();
    // 게임 끝나면 타이머도 멈춰야 한다.
    clearInterval(timer);
  };
  const nextLine = () => {
    // 시도는 6번까지만 가능
    if (attempts === 6) gameover();
    attempts += 1;
    index = 0;
  };
  const handleBackspace = () => {
    // 원래 있던 단어를 지우고 index 줄이기
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index--;
  };
  // 정답 확인
  const handleEnterKey = () => {
    // 정답이 맞으면 게임 종료
    let 맞은_개수 = 0;

    // 항상 5글자 다 입력됐을 때 실행함
    // 각 블록을 정답 위치랑 비교해야 함
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];

      // 위치까지 같으면 초록색
      if (입력한_글자 === 정답_글자) {
        block.style.background = "#6AAA64";
        맞은_개수 += 1;
      } // 위치는 다르지만 정답에 있으면 노란색
      else if (정답.includes(입력한_글자)) block.style.background = "#C9B458";
      // 이도저도 아니면 회색
      else block.style.background = "#787C7E";
      block.style.color = "white";
    }
    // 다 맞았으면 게임 종료
    if (맞은_개수 === 5) gameover();
    // 다 돌았으면 다음 줄로 넘어가자.
    else nextLine();
  };

  const handlekeydown = (event) => {
    // 대문자로
    const key = event.key.toUpperCase();
    // keyCode가 필요한 이유 : 블록에는 알파벳 이외는 들어가면 안된다.
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    // 5글자를 다 쓰면 아무 일도 일어나지 않아야 한다.
    // 이 때는 엔터키만 먹힌다!
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      // 알파벳이 눌렸을 때만 적혀야 한다.
      thisBlock.innerText = key;
      index++;
    }
  };
  const startTimer = () => {
    // 타이머
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString();
      const 초 = 흐른_시간.getSeconds().toString();
      const timeDiv = document.querySelector("#timer");
      timeDiv.innerText = `${분.padStart(2, "0")}:${초.padStart(2, "0")}`;
    }

    // setInterval은 id를 return
    timer = setInterval(setTime, 1000);
    console.log(timer);
  };

  startTimer();
  // 키보드의 키다운 이벤트
  // 키다운 할 때마다 handlekeydown 함수가 실행되므로 인덱스 증가하면서 반복문처럼..
  window.addEventListener("keydown", handlekeydown);
}

appStart();
