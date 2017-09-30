import React from 'react'
import { Col, Breadcrumb, BreadcrumbItem } from 'reactstrap'

const Breadcrumbs = () => (
  <Col md={12}>
    <Breadcrumb>
      <BreadcrumbItem><a href="/">Home</a></BreadcrumbItem>
      <BreadcrumbItem><a href="/test">Library</a></BreadcrumbItem>
      <BreadcrumbItem active>Data</BreadcrumbItem>
    </Breadcrumb>
  </Col>
)

export default Breadcrumbs
