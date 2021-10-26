import { Typography } from "@material-ui/core";

interface PropTypes {
  message: string;
}

const NoData = ({ message }: PropTypes) => {
  return (
    <Typography style={{ margin: 10, textAlign: "center", opacity: 0.5 }} variant="h5">
      {message}
    </Typography>
  );
};

export default NoData;
