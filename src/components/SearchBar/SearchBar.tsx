import { Field, Form, Formik, ErrorMessage, FormikHelpers } from "formik";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import css from "./SearchBar.module.css";

interface FormValues {
  query: string;
}

interface Props {
  onSubmit: (query: string) => void;
}

export const SearchBar = ({ onSubmit }: Props) => {
  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    if (!values.query) {
      toast.error("Please enter a search query");
    } else {
      onSubmit(values.query);
    }
    actions.resetForm();
  };

  return (
    <header className={css.header}>
      <Formik<FormValues> initialValues={{ query: "" }} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <div className={css.inputBox}>
            <Field
              className={css.input}
              name="query"
              type="text"
              autoFocus
              placeholder="Search images and photos"
            />
            <FaSearch className={css.icon} />
          </div>
          <ErrorMessage
            name="query"
            component="span"
            style={{ color: "red" }}
          />
          <button className={css.button} type="submit">
            Search
          </button>
        </Form>
      </Formik>
    </header>
  );
};
