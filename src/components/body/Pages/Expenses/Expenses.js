import './expenses.css'

export default function Expenses() {
    
    return (
        <>
            <div className='expenses'>
                <h1>My Expenses</h1>
                <div className='chart_container'>
                    <div className='piechart'></div>
                    <div className='chart_guide'>
                        <p>Housing</p>
                        <p>Transportion</p>
                        <p>Food</p>
                        <p>Utilities</p>
                        <p>Insurance</p>
                    </div>
                    <div className='chart_guide'>
                        <p>Medical & Healthcare</p>
                        <p>Saving, Investment & debt payments</p>
                        <p>Personal Spending</p>
                        <p>Recreation & Entertainment</p>
                        <p>Miscellaneous</p>
                    </div>
                </div>
            </div>
            
        </>
    )
}