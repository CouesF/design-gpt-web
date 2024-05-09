import Graphin, { Utils, Behaviors,Components } from '@antv/graphin';
import React from 'react';
const { Hoverable, ActivateRelations } = Behaviors;
const { Tooltip } = Components;

const MainGraph = ({ data }) => {
    data.edges = Utils.processEdges(data.edges, { poly: 50, loop: 10 });
    return (
        <Graphin data={data} height='100%' layout={{ type: "graphin-force", }}>
            <Hoverable bindType="node" />
            <Hoverable bindType="edge" />
            <ActivateRelations />
            <Tooltip bindType="node" placement="top" hasArrow={true} style={{
                    backgroundColor: "#ffffff",
                  width:"320px",
                    padding: "16px 24px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
            }}>
            {(value) => {
                if (value.model) {
                    const { model } = value;
                    if (model.id === 'node-6') {
                        // node-6 节点不可以Tooltip
                        // return null;
                    }
                    return (
                        <div>
                            <li> {model.style.label.value}</li>
                            <li> {model.description}</li>
                            <li> {model.link}</li>
                            <li> {model.id}</li>
                        </div>
                    );
                }
                return null;
            }}
        </Tooltip>
        </Graphin >
    )
};

export default MainGraph;
