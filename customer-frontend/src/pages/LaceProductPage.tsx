import React, { useEffect, useMemo } from "react";
import { ProductLace } from "../model/product/ProductLace";
import FirebaseStorageImage from "../components/FirebaseStorageImage";
import Button from "@mui/material/Button";
import { isNil, uniq } from "lodash";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import * as Yup from "yup";
import ColorPicker from "../components/ColorPicker";
import CountSelector from "../components/CountSelector";
import SelectComponent from "../components/SelectComponent";
import Title from "../components/Title";
import { cartActions } from "../store/cartSlice";
import { useAppDispatch } from "../store/hooks";
import { useLocation, useParams } from "react-router-dom";
import { useLaceProducts } from "../hooks/useProductsByKind";
import Typography from "@mui/material/Typography";
import { useColorMapper } from "../hooks/useColorMapper";

interface LaceProductFormValues {
  lace: string;
  color: string;
  size: string;
  count: number;
}

const LaceProductPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const { name } = useParams<{ kind: string; name: string }>();
  const { products } = useLaceProducts(name);
  const { convertColorNameToColorObject } = useColorMapper();

  const initialProductAndAmount = useMemo(() => {
    const passedData = state;
    if (passedData) {
      return passedData as {
        product: ProductLace;
        amount: number;
      };
    } else {
      const defaultProduct =
        products.find((product) => product.is_default === "כן") ?? products[0];

      return {
        product: defaultProduct,
        amount: 1,
      };
    }
  }, [location, products]);

  const validationSchema = Yup.object<LaceProductFormValues>({
    lace: Yup.string().required(),
    color: Yup.string().required(),
    size: Yup.string().required(),
    count: Yup.number().required().min(1),
  });

  const onSubmit = async (values: LaceProductFormValues) => {
    if (isNil(selectedProduct)) return;
    dispatch(
      cartActions.upsertItems([
        {
          id: selectedProduct.id,
          amount: values.count,
        },
      ])
    );
  };

  const initialValues = useMemo(() => {
    return {
      lace: initialProductAndAmount.product.lace,
      color: initialProductAndAmount.product.color,
      size: initialProductAndAmount.product.size,
      count: initialProductAndAmount.amount,
    };
  }, [initialProductAndAmount]);

  const {
    values,
    isSubmitting,
    handleChange,
    handleSubmit,
    touched,
    errors,
    setFieldValue,
  } = useFormik<LaceProductFormValues>({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const availableLaces = useMemo(() => {
    return uniq(products.map((x) => x.lace));
  }, [products]);

  const availableSizes = useMemo(() => {
    const res = uniq(
      products
        .filter((product) => product.lace === values.lace)
        .map((x) => x.size)
    );
    if (!res.includes(values.size)) {
      setFieldValue("size", res[0]);
    }
    return res;
  }, [products, values.lace]);

  const availableColors = useMemo(() => {
    const res = uniq(
      products
        .filter((product) => product.lace === values.lace)
        .filter((product) => product.size === values.size)
        .map((x) => x.color)
    );
    if (!res.includes(values.color)) {
      setFieldValue("color", res[0]);
    }
    return convertColorNameToColorObject(res);
  }, [products, values.lace, values.size, convertColorNameToColorObject]);

  const selectedProduct = useMemo(() => {
    return products.find(
      (p) =>
        p.lace === values.lace &&
        p.size === values.size &&
        p.color === values.color
    );
  }, [products, values.lace, values.color, values.size]);

  useEffect(() => {
    if (
      values.lace === initialProductAndAmount.product.lace &&
      values.size === initialProductAndAmount.product.size &&
      values.color === initialProductAndAmount.product.color
    )
      return;
    setFieldValue("count", 1);
  }, [values.lace, values.size, values.color]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <Title title={initialProductAndAmount?.product?.name ?? "Product"} />
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        {initialProductAndAmount.product.description}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          maxWidth="250px"
          margin="auto"
        >
          <FirebaseStorageImage url={selectedProduct?.image ?? ""} />
          <SelectComponent
            label="תחרה"
            name="lace"
            value={values.lace}
            options={availableLaces}
            onChange={handleChange}
            error={touched.lace && Boolean(errors.lace)}
            helperText={errors.lace}
          />

          <SelectComponent
            label="מידה"
            name="size"
            value={values.size}
            options={availableSizes}
            onChange={handleChange}
            error={touched.size && Boolean(errors.size)}
            helperText={errors.size}
          />
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            {selectedProduct?.size_description}
          </Typography>

          <ColorPicker
            name="color"
            colors={availableColors}
            value={values.color ?? ""}
            onChange={(event) => setFieldValue("color", event.target.value)}
          />

          <CountSelector
            value={values.count}
            onIncrement={() => {
              setFieldValue("count", values.count + 1);
            }}
            onDecrement={() => {
              setFieldValue("count", values.count - 1);
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            sx={{ margin: "1rem 0" }}
          >
            הוסף לסל
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default LaceProductPage;
