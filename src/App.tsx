
import { useState, useEffect  } from 'react'
import './App.css';
import FV from './components/FV/FV';


interface IProduct {
  //id: number;
  name: string;
  price: number;
} 
const products: IProduct[] = [];

function App() {
 const [rate, setRate] = useState<number>(0);
 const [pv, setPv] = useState<number>(0);
 const [nper, setNper] = useState<number>(0);
 const [fx, setFx] = useState<string>('');
 //const [fv, setFv] = useState<string>('');
 //const [myproductprice, setMyProductPrice] = useState(0);
 //const [myproductcount, setMyProductCount] = useState(0);

console.log('App Rate:', rate, 'PV:', pv, 'Nper:', nper, 'functionName:', fx);

  function handleCalculation(rate : number, pv: number, nper: number, functionName: string): void 
  {
    // set Fv's props: rate, pv, nper, functionName
    setRate(rate);
    setPv(pv);
    setNper(nper);
    setFx(functionName);

    console.log('handleCalculation Rate:', rate, 'PV:', pv, 'Nper:', nper, 'functionName:', functionName);
    //setFv("<FV rate={rate} pv={pv} nper={nper} />");
/*     return (
      <FV rate={rate} pv={pv} nper={nper} />
    ); */
  }


function AddMyProduct( name: string, price: number ) : void
{

  console.log('Product name:', name);
  //setMyProduct({ name, price });
  //console.log('Product added:', myproduct);
  //products.push({ name, price });
  //setMyProductCount(products.length);
  //console.log('Total products:', myproductcount);
}

const copyJSON =  (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  let ta: HTMLTextAreaElement  = document.getElementById("prjson") as HTMLTextAreaElement;
  if (ta && ta.value) {
    navigator.clipboard.writeText(ta.value ?? "") ;
  }
}

useEffect(() => {

  //console.log('Component mounted'); 

})


  return (
    <div className="App">

      <header className="App-header">

        <div>
          <code>Future value</code>
          <FV rate={rate} pv = {pv} nper = {nper} functionname = {'FV'} />
        </div>

      </header>

      <main>
        <input type="number" placeholder="Capital" value={pv} onChange={(e) => {setPv(parseFloat(e.target.value))}} />
        <input type="number" placeholder="Rate" value={rate} onChange={(e) => {setRate(parseFloat(e.target.value))}} />
        <input type="number" placeholder="Years" value={nper} onChange={(e) => {setNper(parseFloat(e.target.value))}} />
        <input type="string" placeholder="Fx" value={fx} onChange={(e) => {setFx(e.target.value)}} />

        <button onClick={() => {
          handleCalculation(rate, pv, nper,fx);
        }}>Calculate FV</button>
        


        <article>
          <h4>Products List</h4>

        </article>
      </main>

        <footer>
          <h4>Products List in JSON</h4>
          {/* <p>Total products: {myproductcount}</p> */}
          <div className="clipboard-icon" onClick={copyJSON}>📋</div>
          <textarea id="prjson" placeholder='Products' rows={10} cols={50} value={JSON.stringify(products)} readOnly />
          
        </footer>

    </div>
  );
}

export default App;
