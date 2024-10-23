import s from "./Footer.module.scss";

const date = new Date();
const currentYear = date.getFullYear();

export function Footer() {
	return (
		<footer className={s.footer}>
			<div className={s.company}>
				<span>
					© {currentYear} <a href='#'>Company name</a>
				</span>
				<span> All rights Reserved</span>
			</div>
			<div className={s.logo}>
				<a href='#'>LoGo</a>
			</div>
			<div className={s.information}>
				<a href='#'>Privecy Policy</a>
				<a href='#'>Terms & Condition</a>
			</div>
		</footer>
	);
}
