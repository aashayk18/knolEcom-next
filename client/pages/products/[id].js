import Product from "../../components/Product/Product";
import axios from "axios";

export default function ProductPage({ product }) {
  return <Product product={product} />;
}

export async function getStaticPaths() {
  const baseUrl = "https://knol-ecom-next.vercel.app";
  const response = await axios.get(`${baseUrl}/api/product/ids`);
  const ids = response.data;
  const paths = ids.map((id) => ({
    params: { id: id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const baseUrl = "https://knol-ecom-next.vercel.app";
  const response = await axios.get(`${baseUrl}/api/products/${params.id}`);
  const product = response.data;

  return { props: { product } };
}
