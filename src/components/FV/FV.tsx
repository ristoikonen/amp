import React, {   useState, useEffect,FC } from 'react';

import { FVWrapper } from './FV.styled';
//import axios from 'axios'; 
//axios.defaults.withCredentials = true;
//axios.defaults.headers.common['Content-Type'] = 'application/json';
//axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'; // CORS header not needed for GET requests
//axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'; // CORS header not needed for GET requests
// axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'; // CORS header not needed for GET requests
// axios.defaults.headers.post['Access-Control-Allow-Credentials'] = 'true'; // CORS header not needed for GET requests
// axios.defaults.headers.post['Access-Control-Expose-Headers'] = 'Content-Type, Authorization'; // CORS header not needed for GET requests
//const LAMBDA_URI = "https://lee4cnqs6ryonvdsu2dogpmzuy0uzzjw.lambda-url.ap-southeast-2.on.aws"

const FV_URI = "fv"

interface FVProps 
{
  rate: number;
  pv: number;
  nper: number;
  functionname: string;
}

/* // Define the state type
interface CounterState {
  count: number;
}
type CounterAction =
  | { type: 'increment'; payload: number }
  | { type: 'decrement'; payload: number }
  | { type: 'reset' };
  // The reducer function: takes current state and an action, returns new state
function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'increment':
      return { count: state.count + action.payload };
    case 'decrement':
      return { count: state.count - action.payload };
    case 'reset':
      return { count: 0 };
    default:
      // A reducer must always return a state, even if no action matches
      return state;
  }
} */
/*
interface FinancialData {
  fv: string;
   rate: number;
  pv: number;
  nper: number; 
}
*/


const FV: FC<FVProps> = (props) => {
  const [functionname, setFunctionname] = useState<string | null>(null);
  const [fv, setFV]  = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    setFunctionname(props.functionname ?? '');

    const fetchData = async () => {
      try {
         setLoading(true);
         setError(null);
          console.log("is loading:" + loading);
          console.log("is error:" + error);
         //axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'; 
         //axios.defaults.headers.common['Content-Type'] = 'application/json'; 

/*           const response = await axios.get<string>(
            LAMBDA_URI + FV_URI,
            {
               params: {
                  rate: props.rate ?? 0.0,
                  pv: props.pv ?? 0,
                  nper: props.nper ?? 0,
               },
            }
         );  */


/*         const response = await fetch(LAMBDA_URI + FV_URI, {
          method: 'GET', // Default method for fetch is GET, but explicitly stating for clarity
          headers: {
            "Access-Control-Allow-Origin": "*", // CORS header
            "Content-Type": "application/json", // Often good practice, though not strictly needed for GET with no body
          },
        });
        const result = await response.json(); // Parse the JSON response
 */
         //setFinancialData(result); //response.data);
         // setFinancialData(response.data);
         //console.log("fetchData...");
         //setFV(((props.pv ?? 1) * (props.nper ?? 1)).toFixed(2)); //response.data);
         
      } catch (err: any) {
         if (err && err.response && err.response.data && typeof err.response.data === 'object') {
            setError(err.response.data.message || 'An error occurred while fetching data.');
         } else if (err instanceof Error) {
            setError(err.message);
         } else {
            setError('An unexpected error occurred.');
            console.error(err);
         }
         console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    
    const fetchFVData = async () => {
      
      let fname = (functionname === "FV") ? FV_URI : "";
      let rate = (Number.isNaN(props.rate ?? 0)) ? 0 : props.rate;
      let pv = (Number.isNaN(props.pv ?? 0)) ? 0 : props.pv;
      let nper = (Number.isNaN(props.nper ?? 0)) ? 0 : props.nper;
      let lambda_uri = `https://lee4cnqs6ryonvdsu2dogpmzuy0uzzjw.lambda-url.ap-southeast-2.on.aws/{fname}?rate=${rate}&pv=${pv}&nper=${nper}`;
      console.log(fname, lambda_uri);

      try {
        if(!(fname === null || fname === undefined || fname === '')) 
        {
          const response = await fetch(
            lambda_uri
            //`https://lee4cnqs6ryonvdsu2dogpmzuy0uzzjw.lambda-url.ap-southeast-2.on.aws/{fname}?rate=${rate}&pv=${pv}&nper=${nper}` 
          );
          const data = await response.json();
          let valuedata = data ?? '0.00'; // Ensure data is not null or undefined
          let resultout = (Number.isNaN(valuedata)) ? '0.00' : valuedata;
          setFV(resultout);
          console.log(data, valuedata, resultout);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };


    fetchData();

    fetchFVData();

  }, [props.rate, props.pv, props.nper]); 


return(
 <FVWrapper data-testid="FV">
    {fv == null ? '0' : fv } 
    {/* <button onClick={() => setFV(null)}>fetchFVData</button> */}
 </FVWrapper>
)
};

export default FV;
