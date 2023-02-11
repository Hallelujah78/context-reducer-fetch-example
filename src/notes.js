// #1 example of using useCallback with fetch, note the fetch function is defined outside of useEffect but
//  is wrapped in useCallback
// #2 simple example where fetch function is defined and called inside useEffect
// #3 why you use useCallback
// context and reducer: https://davidwcai.medium.com/state-management-in-react-with-reducer-but-not-redux-3e76824fe4e5
// https://kentcdodds.com/blog/usememo-and-usecallback
// Almost complete guide to React rendering behavior: https://blog.isquaredsoftware.com/2020/05/blogged-answers-a-mostly-complete-guide-to-react-rendering-behavior/#memoize-everything
// Easy article on dependency arrays and what to put in them: https://devtrium.com/posts/dependency-arrays
// context, state, useReducer: https://dev.to/clickpesa/react-manage-state-using-context-api-with-usestate-or-usereducer-hooks-d5l
// practical usage of reducer and context: https://dev.to/jackent2b/the-best-couple-usecontext-usereducer-4e65

// extremely useful thread with helpful answers about persisting state using local storage and how this is a normal scenario: https://stackoverflow.com/questions/73179071/react-persist-data-on-page-refresh-useeffect-usecontext-usestate

// Note: I'm not sure it's even posible to use a useFetch custom hook with context the way I've been trying.
// You can't call a custom hook inside a useEffect. Ideally you would define such a hook in its own file and then import it into your provider and run it inside a useEffect, but this does not seem possible.
// You can also not use context in something that is not a component, i.e. you can't share it with a custom hook that is not part of a component.

// gotcha - if you set value to an array in the context, make sure you destructure an array.
// works if value's type in context (array or object) matches the destructuring type

function OutsideUsageExample({ userId }) {
  const [data, setData] = useState < any > null;

  const fetchMyAPI = useCallback(async () => {
    let response = await fetch("api/data/" + userId);
    response = await response.json();
    setData(response);
  }, [userId]); // if userId changes, useEffect will run again

  useEffect(() => {
    fetchMyAPI();
  }, [fetchMyAPI]);

  return (
    <div>
      <div>data: {JSON.stringify(data)}</div>
      <div>
        <button onClick={fetchMyAPI}>manual fetch</button>
      </div>
    </div>
  );
}

// #2
function Example() {
  const [data, dataSet] = useState < any > null;

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch("api/data");
      response = await response.json();
      dataSet(response);
    }

    fetchMyAPI();
  }, []);

  return <div>{JSON.stringify(data)}</div>;
}

////////////////////

// #3 why we use useCallback
import React, { useState, useEffect, useCallback } from "react";

export default function App() {
  const [counter, setCounter] = useState(1);

  // if counter is changed, than fn will be updated with new counter value
  const fn = useCallback(() => {
    setCounter(counter + 1);
  }, [counter]);

  // if counter is changed, than fn will not be updated and counter will be always 1 inside fn
  /*const fnBad = useCallback(() => {
      setCounter(counter + 1);
    }, []);*/

  // if fn or counter is changed, than useEffect will rerun
  useEffect(() => {
    if (!(counter % 2)) return; // this will stop the loop if counter is not even

    fn();
  }, [fn, counter]);

  // this will be infinite loop because fn is always changing with new counter value
  /*useEffect(() => {
    fn();
  }, [fn]);*/

  return (
    <div>
      <div>Counter is {counter}</div>
      <button onClick={fn}>add +1 count</button>
    </div>
  );
}
