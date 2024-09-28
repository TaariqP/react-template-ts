import { useEffect, useState } from "react";

interface Expense {
    id: number;
    merchant: string;
    amount: number;
    description: string;
    date: string;
    category: string;
    status: string;
}

function App() {
    const [expenses, setExpenses] = useState<Expense[]>([]);

    useEffect(() => {
        const url = "https://expenses-backend-mu.vercel.app/expenses";
        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    headers: {
                        "Content-Type": "application/json",
                        Username: "taariq.pala",
                    },
                });
                const json = await response.json();
                console.log(json)
                setExpenses(json);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div id="template-text">
            <h1>Expenses</h1>
            <hr className="separator"/>
            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Merchant</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {expenses.map((expense) => {
                    const date = new Date(expense.date);
                    const month = date.toLocaleString('default', {month: 'short'});
                    const day = date.getDate();
                    return (
                        <tr key={expense.id}>
                            <td>{`${month} ${day}`}</td>
                            <td>{expense.merchant}</td>
                            <td>{expense.amount}</td>
                            <td>{expense.category}</td>
                            <td>{expense.description}</td>
                            <td>{expense.status}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

export default App;