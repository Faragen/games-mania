import styles from "./Footer.module.scss";

const date = new Date();
const currentYear = date.getFullYear();

export function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.company}>
				<span>
					© {currentYear} <a href='#'>Company name</a>
				</span>
				<span> All rights Reserved</span>
			</div>
			<div className={styles.logo}>
				<a href='#'>LoGo</a>
			</div>
			<div className={styles.information}>
				<a href='#'>Privecy Policy</a>
				<a href='#'>Terms & Condition</a>
			</div>
		</footer>
	);
}
