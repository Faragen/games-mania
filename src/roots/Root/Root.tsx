import { productsList } from "../../store/store";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { Main } from "../../components/Main/Main";

function Root() {
	return (
		<>
			<Header />
			<Main productsList={productsList} />
			<Footer />
		</>
	);
}

export default Root;
