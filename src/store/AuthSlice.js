import { api } from "./PostItemSlice";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const AuthSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    admin: builder.mutation({
      async queryFn(data) {
        let users = [];
        let temp = null;

        const auth = getAuth();

        await signInWithEmailAndPassword(auth, data.email, data.password)
          .then((res) => {
            const obj = {
              token: res._tokenResponse.refreshToken,
              email: res._tokenResponse.email,
              id: res.user.uid,
              expiration: res._tokenResponse.expiresIn,
            };
            temp = { ...obj };
            return { data: "success" };
          })
          .catch((e) => {
            if (e.code === "auth/wrong-password") {
              throw new Error("Wrong password");
            }
            if (e.code === "auth/user-not-found") {
              throw new Error("Email not Found!");
            }
            if (e.code === "auth/too-many-requests") {
              throw new Error("Too many fail Attempt. Try again Later");
            }
            if (e.code === "auth/network-request-failed") {
              throw new Error("No internet Connection");
            }
          });

        if (temp) {
          try {
            const cate = query(collection(db, "nicroUserData"));
            const querySnapshot = await getDocs(cate);

            //Admin Info
            querySnapshot.forEach((doc) => {
              if (doc.data().id !== temp?.id) {
                users.push({ ...doc.data(), docId: doc.id });
              }
              if (doc.data().id === temp?.id) {
                temp = Object.assign({}, { docID: doc.id, ...doc.data() });
                localStorage.setItem("isAdmin", "true");
                localStorage.setItem("userId", JSON.stringify(doc.data().id));
              }
            });
            return { data: { ...temp, users } };
          } catch (e) {
            return { error: e };
          }
        }
      },
    }),
    loggedIn: builder.mutation({
      async queryFn(id) {
        try {
          const cate = query(collection(db, "nicroUserData"));

          let temp = {};
          let users = [];
          const querySnapshot = await getDocs(cate);

          querySnapshot.forEach((doc) => {
            if (doc.data().id === id) {
              temp = Object.assign({}, { docID: doc.id, ...doc.data() });
              localStorage.removeItem("isAdmin");
            }

            if (doc.data().id !== id && temp.isAdmin) {
              users.push({ ...doc.data(), docId: doc.id });
              localStorage.setItem("isAdmin", "true");
            }
          });

          return { data: { ...temp, users } };
        } catch (error) {
          throw new Error(
            error.code || error.message || "something went Wrong"
          );
        }
      },
    }),
    getOneUser: builder.query({
      async queryFn(ProductDocid) {
        try {
          const cate = query(collection(db, "nicroUserData"));

          let temp = {};
          const querySnapshot = await getDocs(cate);

          querySnapshot.forEach((doc) => {
            if (doc.data().id === ProductDocid) {
              temp = Object.assign({}, { docID: doc.id, ...doc.data() });
            }
          });
          return { data: temp };
        } catch (error) {
          throw new Error(
            error.code || error.message || "something went Wrong"
          );
        }
      },
    }),
    signupUser: builder.mutation({
      async queryFn(data) {
        const date = new Date();
        const userData = {
          fname: data.fname,
          lname: data.lname,
          email: data.email,
          password: data.password,
          date: date.toISOString(),
        };
        const auth = getAuth();

        await createUserWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        )
          .then(async (res) => {
            const data = {
              orders: [],
              id: res.user.uid,
              email: res._tokenResponse.email,
              firstName: userData.fname,
              lastName: userData.lname,
              createdOn: userData.date,
            };
            await addDoc(collection(db, "nicroUserData"), { ...data });
            const cate = query(collection(db, "nicroUserData"));
            const querySnapshot = await getDocs(cate);
            querySnapshot.forEach((doc) => {
              if (doc.data().id === data?.id) {
                localStorage.setItem("userId", JSON.stringify(doc.data().id));
                localStorage.removeItem("isAdmin");
              }
              return { data: "success", error: "Something went Wrong" };
            });
            return { data: "success", error: "Something went Wrong" };
          })
          .catch((e) => {
            if (e.code === "auth/wrong-password") {
              throw new Error("Wrong password");
            }
            if (e.code === "auth/user-not-found") {
              throw new Error("Email not Found!");
            }
            if (e.code === "auth/too-many-requests") {
              throw new Error("Too many fail Attempt. Try again Later");
            }
            if (e.code === "auth/network-request-failed") {
              throw new Error("No internet Connection");
            }
          });
      },
    }),
    loginUser: builder.mutation({
      async queryFn(data) {
        const auth = getAuth();
        let user = null;
        await signInWithEmailAndPassword(auth, data.email, data.password)
          .then((res) => {
            const obj = {
              token: res._tokenResponse.refreshToken,
              email: res._tokenResponse.email,
              id: res.user.uid,
              expiration: res._tokenResponse.expiresIn,
            };
            user = { ...obj };
            return { data: "success" };
          })
          .catch((e) => {
            if (e.code === "auth/wrong-password") {
              throw new Error("Wrong password");
            }
            if (e.code === "auth/user-not-found") {
              throw new Error("Email not Found!");
            }
            if (e.code === "auth/too-many-requests") {
              throw new Error("Too many fail Attempt. Try again Later");
            }
            if (e.code === "auth/network-request-failed") {
              throw new Error("No internet Connection");
            }
          });
        if (user) {
          try {
            const cate = query(collection(db, "nicroUserData"));
            const querySnapshot = await getDocs(cate);

            querySnapshot.forEach((doc) => {
              if (doc.data().id === user?.id) {
                localStorage.setItem("userId", JSON.stringify(doc.data().id));
              }
            });
            return { data: "success" };
          } catch (e) {
            return { error: e };
          }
        }
      },
    }),
  }),
});
export const {
  useLoginUserMutation,
  useSignupUserMutation,
  useLoggedInMutation,
  useAdminMutation,
  useGetOneUserQuery,
} = AuthSlice;
