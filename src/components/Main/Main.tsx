import styles from "./Main.module.scss";
import { Product } from "../../store/store";

interface MainProps {
	productsList: Product[];
}

export function Main({ productsList }: MainProps) {
	return (
		<main className={styles.main}>
			<div className={styles.ProductList}>
				{productsList.map((product) => {
					return (
						<div className={styles.ProductCard} key={product.id}>
							<img src={product.image} alt={product.productName} />
							<span>{product.productName}</span>
						</div>
					);
				})}
			</div>
		</main>
	);
}
