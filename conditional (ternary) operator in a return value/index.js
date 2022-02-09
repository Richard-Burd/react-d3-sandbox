import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, arc } from 'd3';

const csvUrl = "https://gist.githubusercontent.com/Richard-Burd/1554b4f94639c3a69f4c4b58f1ee4f3d/raw/cssNamedColors.csv" 

const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;

const pieArc = arc()
	.outerRadius(width)

const App = () => {
  const [data, setData] = useState(null);
  
  useEffect(()=> {
    csv(csvUrl).then(setData);  
  }, []);

  if (!data) {
  	return <pre>Loading...</pre>
  }
  
  // return data.map(d => <div style={{backgroundColor: d['RGB hex value'], width: '960px', height: '4px'}} />)
  return (
  	<svg width={width} height={height}>
      <g transform={`translate(${centerX}, ${centerY})`}>
        {data.map((d, i) => (
          <path 
            fill={(i % 2 == 0) ? d['RGB hex value'] : 'black'}
            fill-opacity={(i % 2 == 0) ? `${40 / i}` : '1'}
            d={pieArc({
              innerRadius: `${i + 0.3}`,
            	startAngle: i / data.length * 2 * Math.PI,
              endAngle: ((i + 1) / data.length) * 2 * Math.PI
            })} 
          />
        ))}
      </g>
    </svg>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);