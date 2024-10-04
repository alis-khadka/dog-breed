import React from 'react';
import { Row, Col, Card } from 'antd';
import { Image } from 'antd';
import { Collapse } from 'antd';

const { Meta } = Card;

const DogSpecificImages = ({ imagesMap }) => {
  return (
    <div>
      <Collapse
        defaultActiveKey={[imagesMap[0].breed]}
        items={imagesMap.map((dogDetails) => ({
          key: dogDetails.breed,
          label: dogDetails.breed,
          children: (
            <Row gutter={[24, 24]} justify="center">
              {dogDetails.images.map((image, index) => (
                <Col
                  key={index}
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  xl={4}
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Card
                    hoverable
                    style={{
                      width: '100%',
                      borderRadius: '8px',
                      overflow: 'hidden',
                    }}
                    cover={
                      <Image
                        alt={`dog-${index}`}
                        src={image}
                        style={{ height: '200px', objectFit: 'cover' }}
                        preview={false}
                      />
                    }
                  >
                    <Meta
                      className='text-center'
                      title={<a className='fs-6' href={image} target='_blank' rel="noreferrer">Main Image</a>}
                      />
                  </Card>
                </Col>
              ))}
            </Row>
          ),
        }))}
      />
    </div>
  );
};

export default DogSpecificImages;
