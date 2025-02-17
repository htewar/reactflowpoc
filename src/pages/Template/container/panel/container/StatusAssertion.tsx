import { FC, Fragment } from "react"
import { InputGroup } from "../../../../../components"
import { InputGroupVariant, InputType } from "../../../../../types"
import { DATA } from "../data"

const StatusAssertion:FC = () => {
    return <Fragment>
        <InputGroup
            title="Status Code"
            variant={InputGroupVariant.Primary}
            type={InputType.Dropdown}
            contents={[...DATA.HTTP_STATUSES]}
            location="message"
            filter={true}
        />
    </Fragment>
}

export default StatusAssertion