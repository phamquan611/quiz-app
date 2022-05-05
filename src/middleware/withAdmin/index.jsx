import React, {useEffect} from 'react';
import { useHistory } from 'react-router-dom';


export default function withAdmin(Component) {
  // TODO CREATE HOC
  return () => {
      const history = useHistory();
        useEffect();
        return <Component />
  }
}
