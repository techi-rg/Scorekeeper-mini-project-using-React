let score = 0;
let wicket = 0;
let ballwiseRes = []; // this array is created to store ball wise result
let hit = 0; //this variable is created to store the last hit score
let inputRef = React.createRef(); // to access the input field value

/**function addOne() { this is done specifically for 1 run button
          score += 1;
          rootElement.render(<App />); Re-render the App component to reflect the updated score
          }
         if we have to handle evenet on single button we can use above method and if same functionality is to be implemented on multiple buttons we can use below method **/

function addScore(num) {
  // this function is created to add score for other buttons
  // if (wicket <10 ){
  //     ballwiseRes.push(num); // pushing the run scored on each ball to the array
  // score += num;
  hit = num;
  rootElement.render(<App />);
  console.log(hit);
}

function addWicket() {
  // if (wicket <10 ){
  //     ballwiseRes.push("W");// this function is created to add wicket

  // wicket += 1;
  hit = "W";
  rootElement.render(<App />);
}

const ScoreButtons = () => (
  <div>
    <button onClick={() => addScore(0)}>0</button>{" "}
    {/*this is how we pass argument to the function while calling it on button click*/}
    <button onClick={() => addScore(1)}>1</button>
    <button onClick={() => addScore(2)}>2</button>
    <button onClick={() => addScore(3)}>3</button>
    <button onClick={() => addScore(4)}>4</button>
    <button onClick={() => addScore(5)}>5</button>
    <button onClick={() => addScore(6)}>6</button>
    <button onClick={addWicket}>wicket</button>
  </div>
);

const Result = () => (
  <div>
    {ballwiseRes.map((res, index) => (
      <>
        {index % 6 === 0 ? <br /> : null}{" "}
        {/* this is done to add a line break after every 6 balls */}
        <span
          key={index}
          style={{
            color: res === "w" ? "red" : "black",
            fontWeight: res === "w" ? "bold" : "normal",
          }}
        >
          {res === 0 ? <strong>.</strong> : res}{" "}
        </span>
        &nbsp;&nbsp;&nbsp;
      </>
    ))}
  </div>
);

function handleSubmit(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  // You can add your form submission logic here
  if (hit == "W") {
    wicket += 1;
  } else {
    score += hit;
  }
  ballwiseRes.unshift(
    // (<span>{hit}{","}{inputRef.current.value}</span>); /**this is onw way to get the commentary along with the score */  // using unshift to adding the last hit score to the beginning of the array
    <span> {`${hit}, ${inputRef.current.value}`}</span>
  );
  // another way to get the commentary along with the score

  hit = 0; // resetting the hit variable after form submission
  inputRef.current.value = ""; // resetting the input field after form submission

  console.log(inputRef.current.value);
  rootElement.render(<App />);
}
const Form = () => (
  <form onSubmit={handleSubmit}>
    <input value={hit} />
    <input ref={inputRef} placeholder="write commentry" />
    <button>Submit</button>
  </form>
);

const App = () => (
  <>
    <h1>SCORE KEEPER</h1>
    <h2>
      SCORE: {score}/{wicket}
    </h2>
    <ScoreButtons />
    <br />

    <Form />
    <hr />
    {ballwiseRes.map((res, index) => (
      <p key={index}>{res}</p>
    ))}
    {/*<Result />*/}
  </>
);

const rootElement = ReactDOM.createRoot(document.getElementById("root"));
rootElement.render(<App />);
