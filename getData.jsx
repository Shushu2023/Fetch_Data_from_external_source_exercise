

//import React from 'react'
//import 'bootstrap/dist/css/bootstrap.min.css'

//define a custom hook useDataApi
//a custom hook is a function thta usesa React Hook,
//so the funtion name starts with "use"
//custom hooks acan be reused in other web components
//it initaize the states
//it takes 2 arguments
//the new query and the data as an empty array
//it returns an array  containing an object of a number of state variables 
//and a function doFetch() that sets the url state variable 
//setting the url state variale causes app rerendering
  const useDataApi = (initialUrl, initialData) => {
  const { useState, useEffect, useReducer } = React;
  const [url, setUrl] = useState(initialUrl);
// here we bundled  together three state variables
// isLoading, isError and data
//we are also passing a function dispatch() which
//will be used in useEffect to change the state depending on wherer we are in the Lifsyclye""

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData
  });

  //function useEffect monitors changes in the state variable  for rerendering
  //whenever the url is set by useApi using doFetch()
  //useEffect function is fired
  useEffect(() => {
      console.log("in useEffect");
    let didCancel = false;
    //the type inside of dispatch is from datFetchReducer()
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios(url);
        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [url]);
  return [state, setUrl];
};
//this is the function passed to useReducer
//it takes the state and action 
//inside the action has to have a type
// to switch between states and overwrite the state variables
// then the new states will be used in the useEffect function
const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,//spread the  3 state variables
        isLoading: true,//overwrite isLoading state variable
        isError: false //overwrite isError state variable 
      };
    case "FETCH_SUCCESS":
      return {
        ...state,//spread the  3 state variables
        isLoading: false,//overwrite isLoading state variable
        isError: false,//overwrite isError state variable
        data: action.payload
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      throw new Error();
  }
};

function App() {
  const { Fragment, useState, useEffect, useReducer } = React;
  const [query, setQuery] = useState("");
  console.log('in the app');
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    "https://coronavirus.m.pipedream.net/search?query=Illinouis",
    {
      rawData: []
    }
  );
 
  return (
    <Fragment>
      <form
        onSubmit={event => {
          //doFetch(`https://coronavirus.m.pipedream.net/search?query=${query}`);
         console.log(query);
          let selectedItem = data.rawData.find(item=>item.Country_Region==query);
          console.log(`onSubmit ${selectedItem.Country_Region}`)
          let selectedItems = [selectedItem];
          console.log(`onSubmit selectedItems array : ${selectedItems} length=${selectedItems.length}`);
          event.preventDefault();
          return(
          <ul className="list-group"> 
          {selectedItems.map(item => (
            
            <li className="list-group-item"   style={{ border: '1px solid blue'}} key={item.Combined_Key} padding="0.5px">
              {/*<a href={item.url}>{item.title}</a>*/}
             <h5><span style={{color:'blue'}}>Country_Region:</span></h5>
             <h6>{item.Country_Region} </h6>
             console.log(item.Country_Region);
             <h5><span style={{color:'blue'}}>Last update:</span></h5>
             <h6>{item.Last_Update}</h6> 
             <h5><span style={{color:'blue'}}>Lat:</span></h5>
             <h6>{item.Lat}</h6>
             <h5><span style={{color:'blue'}}>Long:</span></h5>
             <h6>{item.Long_}</h6>
             <h5><span style={{color:'blue'}}>Confirmed:</span></h5>
             <h6>{item.Confirmed}</h6>
             <h5><span style={{color:'blue'}}>Deaths:</span></h5>
             <h6>{item.Deaths}</h6>
             <h5><span style={{color:'blue'}}>Recovered:</span></h5>
             <h6>{item.Recovered}</h6>
             <h5><span style={{color:'blue'}}>Active:</span></h5>
             <h6>{item.Active}</h6>
             <h5><span style={{color:'blue'}}>Incident Rate:</span></h5>
             <h6>{item.Incident_Rate}</h6>
             <h5><span style={{color:'blue'}}>case fatality ratio:</span></h5> 
             <h6>{item.Case_Fatality_Ratio}</h6> 
            </li>
          ))}
        </ul>
        );
        
        }}
      >
        <input 
          disabled
          placeholder="Wait for data to load"
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
          
        />
        <button type="submit">Search</button>
      </form>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
       
       
        <ul className="list-group">
         
          {data.rawData.map(item => (
            <li className="list-group-item"   style={{ border: '1px solid blue'}} key={item.Combined_Key} padding="0.5px">
              {/*<a href={item.url}>{item.title}</a>*/}
             <h5><span style={{color:'blue'}}>Country_Region:</span></h5>
             <h6>{item.Country_Region} </h6>
             <h5><span style={{color:'blue'}}>Last update:</span></h5>
             <h6>{item.Last_Update}</h6> 
             <h5><span style={{color:'blue'}}>Lat:</span></h5>
             <h6>{item.Lat}</h6>
             <h5><span style={{color:'blue'}}>Long:</span></h5>
             <h6>{item.Long_}</h6>
             <h5><span style={{color:'blue'}}>Confirmed:</span></h5>
             <h6>{item.Confirmed}</h6>
             <h5><span style={{color:'blue'}}>Deaths:</span></h5>
             <h6>{item.Deaths}</h6>
             <h5><span style={{color:'blue'}}>Recovered:</span></h5>
             <h6>{item.Recovered}</h6>
             <h5><span style={{color:'blue'}}>Active:</span></h5>
             <h6>{item.Active}</h6>
             <h5><span style={{color:'blue'}}>Incident Rate:</span></h5>
             <h6>{item.Incident_Rate}</h6>
             <h5><span style={{color:'blue'}}>case fatality ratio:</span></h5> 
             <h6>{item.Case_Fatality_Ratio}</h6> 
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
}

// ========================================
ReactDOM.render(<App />, document.getElementById("root"));
