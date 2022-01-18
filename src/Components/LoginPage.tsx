import {useState} from "react";

function LoginPage() {
		const [name, setName] = useState("");
		const [password, setPassword] = useState("");
		const [pwType, setPwType] = useState("password");

		const changePwType = () => {
				if (pwType != "password") setPwType("password");
				else setPwType("text");
		}
		

		return (
				<div id="login">
				<h1>Login</h1>
				<input type="username" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required
				/>
				<input type={pwType} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Passwort" required/>
				<input type="submit" value="Login" />
				</div>
		)
} 

export default LoginPage;
