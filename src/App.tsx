import React, { useState, useEffect } from 'react';
import Features from './components/features/Features';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import Search from './components/search/Search';
import { Feature, SiteContent } from './shared/interfaces';

function App() {
  const [siteContent, setSiteContent] = useState<SiteContent>({} as SiteContent);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getFeatures = (data: SiteContent) => {
    const features = data.items.filter(item => item.feature).map(item => {
      return {
        type: item.type, 
        imageUrl: item.feature?.imageUrl, 
        url: item.feature?.url, 
        title: item.feature?.title,
        description: item.feature?.description
      };
    }) as Feature[];
    setFeatures(features);
  };

  useEffect(() => {
    fetch('/MicrosoftCloud/data/items.json')
      .then(response => response.json())
      .then(data => {
        document.title = data.metadata.title;
        setIsLoading(false);
        setSiteContent(data);
        getFeatures(data);
      }).catch(error => {
        console.log(error);
      }
      );
  }, []);

  return (
    <>
    {isLoading 
      ? 
        <div>Loading...</div> 
      :      
        <div>
          <Navbar data={siteContent.navbar} />
          <Header data={siteContent.header} />
          <Features data={features} />
          <Search data={siteContent.items} />
        </div>
    }
    </>
  );
}

export default App;
