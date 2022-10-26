/* eslint-disable */
import Tabview from '../../tabview/Tabview';
export const ProjCard = (props) => {
  return (
    <>
      <Tabview
        componentName={props.componentName}
        path={props.path}
        description={props.description}
        codeSnippet={props.codeSnippet}
        libraryUsed={props.libraryUsed}
        customHooks={props.customHooks}
        reduxStore={props.reduxStore}
        //customHooks={['./formik/createOrg','removeActiveAdminForm']}
        apiUsed={props.apiUsed}
        images={props.images}
        stylesheetUsed={props.stylesheetUsed}
        example={props.example}
      />
    </>
  );
};
