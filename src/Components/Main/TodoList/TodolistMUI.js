import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 70,
        maxWidth: 140,
        fontFamily: '"Open Sans"'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
        fontFamily: '"Open Sans"',
        fontSize: 18,
        '@media (max-width:560px)': {
            fontSize: 12
        }
    },
}));
export default useStyles;
