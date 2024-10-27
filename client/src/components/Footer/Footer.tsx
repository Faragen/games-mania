import { Link } from "react-router-dom";
import s from "./Footer.module.scss";

const date = new Date();
const currentYear = date.getFullYear();

export function Footer() {
	return (
		<footer className={s.footer}>
			<div className={s.company}>
				<span>
					© {currentYear} <Link to='#'>Company name</Link>
				</span>
				<span> All rights Reserved</span>
			</div>
			<div className={s.logo}>
				<Link to='/'>LoGo</Link>
			</div>
			<div className={s.information}>
				<Link to='#'>Privecy Policy</Link>
				<Link to='#'>Terms & Condition</Link>
			</div>
		</footer>
	);
}
