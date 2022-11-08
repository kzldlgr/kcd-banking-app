import './expenses.css'
import BarChart from '../../../CustomCharts/BarChart';

export default function Expenses() {
    
    return (
        <>
            <div className='expenses'>
                <h1>My Expenses</h1>
                <div className='chart_container'>
                    <div className='customchart'><BarChart/></div>
                </div>
            </div>
            
        </>
    )
}