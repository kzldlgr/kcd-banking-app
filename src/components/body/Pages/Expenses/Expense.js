import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { UsersContext } from "../../../../context/UsersContext";

export default function Expense() {
	const newDate = new Date();
	const { users, setUsers } = useContext(UsersContext);
	const { register, handleSubmit } = useForm();
	const [category, setCategory] = useState([]);
	let currentUser = JSON.parse(sessionStorage.getItem("user"));
	const expenseCategory = [
		{
			code: "HOU",
			desc: "Housing",
		},
		{
			code: "TRA",
			desc: "Transportation",
		},
		{
			code: "FOO",
			desc: "Food",
		},
		{
			code: "UTI",
			desc: "Utilities",
		},
		{
			code: "INS",
			desc: "Insurance",
		},
		{
			code: "MED",
			desc: "Medical & Healthcare",
		},
		{
			code: "SAV",
			desc: "Savings, Investment & Debt Payments",
		},
		{
			code: "PER",
			desc: "Personal Spending",
		},
		{
			code: "REC",
			desc: "Recreation & Entertainment",
		},
		{
			code: "MIS",
			desc: "Miscellaneous",
		},
	];

	useEffect(() => {
		setCategory(
			expenseCategory.map((cat, index) => (
				<option key={index} value={cat.code}>
					{cat.desc}
				</option>
			))
		);
	}, []);

	const onSubmit = (data) => {
		
		users.forEach((user) => {
			if (user.accountnum === currentUser.accountnum) {
				user.balance = data.checksavings ? Number(user.balance) - Number(data.amount) : user.balance
				user.myhistory = [
					...user.myhistory,
					{
						date: `${newDate.getMonth() + 1}-${newDate.getDate()}-${newDate.getFullYear()}`,
						category: data.category,
						amount: data.amount,
						description: data.checksavings ? `${data.description} paid using your savings account` : data.description,
						type: "expense",
					},
				];
			}
		});
		localStorage.setItem("users", JSON.stringify(users));
		setUsers(JSON.parse(localStorage.getItem("users")));
	};

	return (
		<div className="p-5 w-full place-content-center font-pop bg-base-100 rounded-md">
			<form className="w-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
				<span className="font-bold text-lg">Category</span>
				<select {...register("category")} className="select select-bordered w-full">
					{category}
				</select>

				<span className="font-bold text-lg">Amount</span>
				<input type="number" {...register("amount")} className="input input-bordered" />

				<span className="font-bold text-lg">Description</span>
				<textarea {...register("description")} className="input input-bordered" />

				<div className="flex">
					<input {...register('checksavings')} type='checkbox' id="flexCheckChecked" className='form-check-input h-4 w-4 mt-1 mr-2 cursor-pointer'/>
					<label for='flexCheckChecked' className="form-check-label inline-block text-gray-800 grow-1">Use your Savings</label>
				</div>
				<input type="submit" value="Add" className="btn btn-primary self-end mt-3" />
				
			</form>
		</div>
	);
}
