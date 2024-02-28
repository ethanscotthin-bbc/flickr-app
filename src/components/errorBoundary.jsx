import React from 'react';

export class ErrorBoundary extends React.Component {
   constructor(props) {
     super(props);
     this.state = { hasError: false };
   }

   static getDerivedStateFromError(error) {
     return { hasError: true };
   }

   componentDidCatch(error, info) {
     console.log(error, info.componentStack);
   }

   render() {
     if (this.state.hasError) {
       return (
         <div style={{padding:"50px"}}>
           <h1>An error has occurred in component rendering!</h1>
         </div>
       );
     }
     return this.props.children;
   }
 }
