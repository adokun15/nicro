import { api } from "./PostItemSlice";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";

import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "@firebase/storage";

const ProductSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      keepUnusedDataFor: 10000,
      refetchOnReconnect: true,
      async queryFn() {
        const cate = query(collection(db, "nicroCategory"));
        try {
          let temp = [];
          const querySnapshot = await getDocs(cate);

          querySnapshot?.forEach((doc) => {
            if (!doc.id) {
              throw new Error({
                message: "Something Went Wrong",
                status: 500,
              });
            }
            temp.push({ docID: doc.id, ...doc.data() });
          });
          return { data: temp };
        } catch (error) {
          throw new Error({
            message: error.message || error.code,
            status: 500,
          });
        }
      },
    }),
    addToCategoryProducts: builder.mutation({
      async queryFn({
        categoryId,
        productId,
        productImage,
        categoryName,
        productName,
        productPrice,
        prevCategory,
      }) {
        try {
          //let tempPercent = null;

          const filePath = ref(
            storage,
            `/nicroItems/${categoryName}/${productId}`
          );

          const uploadTask = uploadBytesResumable(filePath, productImage);

          uploadTask.on(
            "state_changed",
            () => {},
            (err) => console.log(err),
            async () => {
              // download url
              await getDownloadURL(uploadTask.snapshot.ref).then(
                async (url) => {
                  const Item = {
                    name: productName,
                    id: productId,
                    price: productPrice,
                    productImage: url,
                  };
                  const category = {
                    id: categoryId,
                    categoryName,
                    items: [Item],
                  };

                  //Add Item as Single Collection
                  await addDoc(collection(db, "nicroItems"), Item);

                  const isCategory = prevCategory.find(
                    (val) => val.categoryName === categoryName
                  );

                  if (!isCategory) {
                    //create category Database
                    await addDoc(collection(db, "nicroCategory"), category);
                    return;
                  }

                  let newItem = [Item, ...isCategory.items];

                  const docRef = doc(db, "nicroCategory", isCategory.docID);
                  const info = {
                    items: newItem,
                  };
                  //Update single CateGory database
                  if (isCategory) {
                    await updateDoc(docRef, info);
                  }
                }
              );
            }
          );

          return { data: "Success" };
        } catch (error) {
          throw new Error({
            message: error.message || error.code,
            status: 500,
          });
        }
      },
      //change Later
      // invalidatesTags: ["products"],
    }),
    updateSingleProduct: builder.mutation({
      async queryFn({
        allCate,
        productCategoryName,
        ProductDocid,
        productId,
        name,
        price,
      }) {
        /// productCategory, ProductDocid, productId, name, price

        try {
          //update product

          const ProductRef = doc(db, "nicroItems", ProductDocid);

          const productInfo = {
            name,
            price,
          };

          //  console.log(productInfo);
          await updateDoc(ProductRef, productInfo);

          //update Category

          const productCategory = allCate.find(
            (val) => val.categoryName === productCategoryName
          );

          //  console.log(productCategory.items);
          let newItem = productCategory.items.map((val) => {
            if (val.id === productId) {
              return { ...val, name, price };
            } else {
              return { ...val };
            }
          });
          console.log(newItem);

          //console.log(newItem);
          const docRef = doc(db, "nicroCategory", productCategory.docID);
          const info = {
            items: newItem,
          };
          //Update single CateGory database

          await updateDoc(docRef, info);
          return { data: "Success" };
        } catch (e) {
          throw new Error({
            message: e?.message || e?.code || "Something went wrong",
            status: 500,
          });
        }
      },
      //invalidatesTags: ["products"],
    }),
    getSingleProduct: builder.query({
      async queryFn(id) {
        try {
          const cate = query(collection(db, "nicroItems"));

          let emp;
          const querySnapshot = await getDocs(cate);
          querySnapshot.forEach((doc) => {
            if (doc.data().id === +id) {
              emp = { ...doc.data(), docID: doc.id };
            }
          });

          return { data: emp };
        } catch (error) {
          throw new Error({
            message: error.message || error.code,
            status: 500,
          });
        }
      },

      //  providesTags: (result) => [{ type: "products", id: result.id }],
    }),
    DeleteSingleProduct: builder.mutation({
      async queryFn({ allCate, productCategoryName, ProductDocid, productId }) {
        /// productCategory, ProductDocid, productId, name, price

        try {
          // DELETE product

          const ProductRef = doc(db, "nicroItems", ProductDocid);

          await deleteDoc(ProductRef);

          //const storage = getStorage();

          // Create a reference to the file to delete
          const productImage = ref(
            storage,
            `/nicroItems/${productCategoryName}/${productId}`
          );

          // Delete the file

          const productCategory = allCate.find(
            (val) => val.categoryName === productCategoryName
          );

          let newItem = productCategory.items.filter(
            (val) => val.id !== productId
          );

          //console.log(newItem);
          const docRef = doc(db, "nicroCategory", productCategory.docID);
          const info = {
            items: newItem,
          };
          //Update single CateGory database

          await updateDoc(docRef, info);

          await deleteObject(productImage);
          return { data: "Success" };
        } catch (error) {
          throw new Error({
            message: error.message || error.code,
            status: 500,
          });
        }
      },
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useGetSingleProductQuery,
  useDeleteSingleProductMutation,
  useAddToCategoryProductsMutation,
  useUpdateSingleProductMutation,
} = ProductSlice;
