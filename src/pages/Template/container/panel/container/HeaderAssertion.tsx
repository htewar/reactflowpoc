import { FC, Fragment } from "react";
import { InputGroup } from "../../../../../components";
import { InputGroupVariant } from "../../../../../types";

const HeaderAssertion:FC = () => {
    return <Fragment>
        <InputGroup
            title="Header Pair"
            variant={InputGroupVariant.Primary}
            placeholder="key_name"
        />
        <InputGroup
            title=""
            variant={InputGroupVariant.Primary}
            placeholder="value_name"
        />
    </Fragment>
}

export default HeaderAssertion;