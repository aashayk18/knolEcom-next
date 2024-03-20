import Product from '../../components/Product/Product'; 
import axios from "axios";

export default function ProductPage({product}){
    return <Product product={product}/>
}

export async function getStaticPaths() {
    const response = await axios.get(`http://localhost:4000/api/product/ids`);
    const ids = response.data;
    const paths = ids.map((id) => ({
      params: { id: id.toString() },
    }));
  
    return { paths, fallback: false };
  }
  
  export async function getStaticProps({ params }) {
    const response = await axios.get(`http://localhost:4000/api/products/${params.id}`);
    const product = response.data;
  
    return { props: { product } };
  }