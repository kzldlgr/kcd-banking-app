import BarChart from "../../../CustomCharts/BarChart";

export default function Expenses() {
	return (
		<div className="font-pop w-full flex flex-col gap-2">
			<h1 className="font-bold text-2xl">My Expenses</h1>
			<div className="self-end w-full">
				<BarChart />
			</div>
		</div>
	);
}
