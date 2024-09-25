// export async function getProducts(
//   url: string,
//   limit: number,
//   lastProductSize: number
// ): Promise<Product[]> {
//   try {
//     const response = await fetch(
//       url +
//         `/api/products?limit=${limit}` +
//         `&lastProductsSize=${lastProductSize}`
//     );

//     if (!response.ok) {
//       throw new Error(`ERROR! status:${response.status}`);
//     }

//     const data: Product[] = await response.json();
//     return data;
//   } catch (error) {
//     const errorMsg =
//       error instanceof Error ? error.message : "It's an error...";
//     console.log(errorMsg);
//     return [];
//   }
// }
