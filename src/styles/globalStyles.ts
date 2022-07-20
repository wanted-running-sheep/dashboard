import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import '@/assets/font.css';

const GlobalStyles = createGlobalStyle`
 ${reset}
 * {
   box-sizing:border-box;
   outline:none;
   border:none;
   font-family: 'GothicA1-Light', sans-serif;
 }
 h1{
   font-family: 'GothicA1-Black', sans-serif;
 }
 button, option {
  font-family: 'GothicA1-Medium', sans-serif;
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
