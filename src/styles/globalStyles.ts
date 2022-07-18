import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
 ${reset}
 * {
   box-sizing:border-box;
   outline:none;
   border:none;
 }
 ul{
  list-style: none;
 }
 a {
  text-decoration: none;
 }
 button {
  cursor: pointer
 }
`;

export default GlobalStyles;
