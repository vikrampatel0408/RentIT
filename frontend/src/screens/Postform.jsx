import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBFile,
} from "mdb-react-ui-kit";
const Postform = () => {
  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center">
        <MDBCol lg="9" className="my-5">
          <MDBCard>
            <MDBCardBody className="px-4">
              <h1>Apply</h1>
              <MDBRow className="align-items-center pt-4 pb-3">
                <MDBCol md="3" className="ps-5">
                  <h6 className="mb-0">Full name</h6>
                </MDBCol>

                <MDBCol md="9" className="pe-5">
                  <MDBInput label="Email" size="lg" id="form1" type="text" />
                </MDBCol>
              </MDBRow>

              <hr className="mx-n3" />
              <MDBRow className="align-items-center pt-4 pb-3">
                <MDBCol md="3" className="ps-5">
                  <h6 className="mb-0">Email address</h6>
                </MDBCol>

                <MDBCol md="9" className="pe-5">
                  <MDBInput
                    label="example@example.com"
                    size="lg"
                    id="form2"
                    type="email"
                  />
                </MDBCol>
              </MDBRow>

              <hr className="mx-n3" />

              <MDBRow className="align-items-center pt-4 pb-3">
                <MDBCol md="3" className="ps-5">
                  <h6 className="mb-0">Message</h6>
                </MDBCol>

                <MDBCol md="9" className="pe-5">
                  <MDBTextArea label="Message" id="textAreaExample" rows={3} />
                </MDBCol>
              </MDBRow>

              <hr className="mx-n3" />

              <MDBRow className="align-items-center pt-4 pb-3">
                <MDBCol md="3" className="ps-5">
                  <h6 className="mb-0">Upload CV</h6>
                </MDBCol>

                <MDBCol md="9" className="pe-5">
                  <MDBFile size="lg" id="customFile" />
                  <div className="small text-muted mt-2">
                    <p>
                      Upload your CV/Resume or any other relevant file. Max file
                      size 50 MB
                    </p>
                  </div>
                </MDBCol>
              </MDBRow>

              <hr className="mx-n3" />

              <MDBBtn className="my-4" size="lg">
                send application
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Postform;
