import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Layout, Typography, Drawer, Button } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import BreedSelector from './components/BreedSelector';
import ImageGallery from './components/ImageGallery';

import './App.scss'

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

function App() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [dogImages, setDogImages] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    axios.get('https://dog.ceo/api/breeds/list/all')
      .then(response => {
        const breedList = Object.keys(response.data.message);
        setBreeds(breedList);
      });
  }, []);

  useEffect(() => {
    if (selectedBreeds.length > 0) {
      const breedPromises = selectedBreeds.map(breed =>
        axios.get(`https://dog.ceo/api/breed/${breed}/images`)
      );

      Promise.all(breedPromises)
        .then(responses => {
          let dogImages = [];
          responses.forEach((res) => {
            let responseURLArr = res.request.responseURL.split('/')

            dogImages.push({
              breed: responseURLArr[responseURLArr.length - 2],
              images: res.data.message
            })
          })

          setDogImages(dogImages);
        });
    }
  }, [selectedBreeds]);

  return (
    <Layout>
      <Header className='d-flex align-items-center justify-content-md-center justify-content-between position-fixed top-0 w-100 py-5'>
        <Title className='mb-0 fw-bold' level={2}>
          Dog Image Gallery
        </Title>
        {isMobile && (
          <Button
            icon={<FilterOutlined />}
            onClick={() => setDrawerVisible(true)}
          >
            Select Breeds
          </Button>
        )}
      </Header>

      <Layout>
        {/* Desktop Sidebar */}
        {!isMobile && (
          <Sider width={300} className='position-fixed top-0 bottom-0' style={{ height: '100vh', width: '300px' }}>
            <BreedSelector breeds={breeds} selectedBreeds={selectedBreeds} setSelectedBreeds={setSelectedBreeds} />
          </Sider>
        )}

        {/* Mobile Drawer */}
        {isMobile && (
          <Drawer
            title="Select Breeds"
            placement="bottom"
            height="400"
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            closable={true}
          >
            <BreedSelector
              breeds={breeds}
              selectedBreeds={selectedBreeds}
              setSelectedBreeds={setSelectedBreeds}
            />
          </Drawer>
        )}

        <Content>
          <ImageGallery images={dogImages} />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
