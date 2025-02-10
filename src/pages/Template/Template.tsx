import { DndProvider } from "react-dnd";
import { Draft, OutputPanel, Panel } from "./container";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ReactFlowProvider } from "reactflow";
import { FC, useEffect } from "react";
import { Icon } from "../../components";
import { connect } from "react-redux";
import { RootState } from "../../types";
import { Dispatch } from "redux";
import { toggleTerminalDisplay } from "../../redux/actions/utils.action";

interface TemplateProps {
    showOPPanel: boolean,
    dispatch: Dispatch,
}

const Template: FC<TemplateProps> = ({ showOPPanel, dispatch }) => {
    useEffect(() => {
        dispatch(toggleTerminalDisplay({ isInvert: false }))
    }, [])

    const onToggleShowPanel = () => dispatch(toggleTerminalDisplay())

    return <section className="section-template">
        <DndProvider backend={HTML5Backend}>
            <Panel />
            <div className="template__draft">
                <ReactFlowProvider>
                    <Draft />
                </ReactFlowProvider>
            </div>
        </DndProvider>
        <span className="template__panelStatus" onClick={onToggleShowPanel}><Icon name="Code" /></span>
        <OutputPanel isShown={showOPPanel} onHandleHeaderClose={onToggleShowPanel} />
    </section>
}

const mapStateToProps = ({ utils }: RootState) => ({
    showOPPanel: utils.isTerminalDisplayed
})

export default connect(mapStateToProps)(Template);