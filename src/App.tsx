
import { useState, useEffect  } from 'react'
//import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SelectField,Link,Flex
    ,Badge, View, Card, Divider, Heading, Button, Collection
  } from '@aws-amplify/ui-react';
  
import './App.css';
import FV from './components/FV/FV';
import { ChangeEvent } from 'react';
//import { useNavigate } from 'react-router-dom';


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
 const [selectedFx, setSelectedFx] = useState<string>('');
 const [showFV, setShowFV] = useState<boolean>(false);
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

  interface SelectChangeEvent extends ChangeEvent<HTMLSelectElement> {}

  const handleSelectChange = (event: SelectChangeEvent): void => {
    const selectedValue: string = event.target.value;
    setSelectedFx(selectedValue);
    console.log('Selected value:', selectedValue);
    //if (selectedValue) {
    //  const navigate = useNavigate();
    //  navigate(selectedValue);
    //  }
  };

useEffect(() => {



})


  return (
    <div className="App">

      <header className="App-header">


        <div>
          <code>Future value</code>
            <Flex>
              <Link as="a" href="/FV/123" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
              <Link as="a" href="/FV/321" style={{ textDecoration: 'none', color: 'inherit' }}>About</Link>
              <Link as="a" href="/FV/444" style={{ textDecoration: 'none', color: 'inherit' }}>Users</Link>
            </Flex>
          
          {/* to={`/products/${product.slug}`} */}

          <Link href="/FV/123" isExternal={false}>
            <div className="btn">View Details</div>
          </Link>


              <SelectField
                label="Function"
                descriptiveText="Choose function"
                value={selectedFx}
                onChange={handleSelectChange}
              >
                  <option value="FV">FV</option>
                  <option value="NPer">NPer</option>
                  <option value="Pmt">Pmt</option>
                  <option value="SLN" disabled>SLN</option>
              </SelectField>

          {showFV && <FV rate={rate} pv = {pv} nper = {nper} />}
          <button onClick={() => setShowFV(!showFV)}>Toggle FV</button>
          
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
