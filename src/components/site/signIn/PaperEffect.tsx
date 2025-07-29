"use client"
import paper from "paper";
import { useEffect } from "react";

export default function PaperEffect() {
    useEffect(() => {
        // Paper.js Initialization
        // paper.install(window);

        paper.setup(document.getElementById("canvas") as HTMLCanvasElement);

        let canvasWidth: number,
            canvasHeight: number,
            canvasMiddleX: number,
            canvasMiddleY: number;
        let shapeGroup = new paper.Group();
        let positionArray: { x: number, y: number }[] = [];

        function getCanvasBounds() {
            canvasWidth = paper.view.size.width;
            canvasHeight = paper.view.size.height;
            canvasMiddleX = canvasWidth / 2;
            canvasMiddleY = canvasHeight / 2;

            const positions = [
                { x: (canvasMiddleX / 2) + 100, y: 100 },
                { x: 200, y: canvasMiddleY },
                { x: (canvasMiddleX - 50) + (canvasMiddleX / 2), y: 150 },
                { x: 0, y: canvasMiddleY + 100 },
                { x: canvasWidth - 130, y: canvasHeight - 75 },
                { x: canvasMiddleX + 80, y: canvasHeight - 50 },
                { x: canvasWidth + 60, y: canvasMiddleY - 50 },
                { x: canvasMiddleX + 100, y: canvasMiddleY + 100 }
            ];

            positionArray = positions;
        }

        function initializeShapes() {
            getCanvasBounds();

            const shapePathData = [
                'M231,352l445-156L600,0L452,54L331,3L0,48L231,352',
                'M0,0l64,219L29,343l535,30L478,37l-133,4L0,0z',
                'M0,65l16,138l96,107l270-2L470,0L337,4L0,65z',
                'M333,0L0,94l64,219L29,437l570-151l-196-42L333,0',
                'M331.9,3.6l-331,45l231,304l445-156l-76-196l-148,54L331.9,3.6z',
                'M389,352l92-113l195-43l0,0l0,0L445,48l-80,1L122.7,0L0,275.2L162,297L389,352',
                'M 50 100 L 300 150 L 550 50 L 750 300 L 500 250 L 300 450 L 50 100',
                'M 700 350 L 500 350 L 700 500 L 400 400 L 200 450 L 250 350 L 100 300 L 150 50 L 350 100 L 250 150 L 450 150 L 400 50 L 550 150 L 350 250 L 650 150 L 650 50 L 700 150 L 600 250 L 750 250 L 650 300 L 700 350 '
            ];

            for (let i = 0; i < shapePathData.length; i++) {
                const headerShape = new paper.Path({
                    strokeColor: ' rgba(255, 255, 255, 0.5)',
                    // rgba(255, 255, 255, 0.5)
                    strokeWidth: 2,
                    parent: shapeGroup
                });
                headerShape.pathData = shapePathData[i];
                headerShape.scale(2);
                headerShape.position = new paper.Point(positionArray[i].x, positionArray[i].y);

            }
        }

        initializeShapes();

        paper.view.onFrame = (event: any) => {
            if (event.count % 4 === 0) {
                shapeGroup.children.forEach((shape, index) => {
                    if (index % 2 === 0) {
                        shape.rotate(-0.1);
                    } else {
                        shape.rotate(0.1);
                    }
                });
            }
        };



        paper.view.onResize = () => {
            getCanvasBounds();
            shapeGroup.children.forEach((shape, i) => {
                shape.position = new paper.Point(positionArray[i].x, positionArray[i].y);
            });

            if (canvasWidth < 700) {
                shapeGroup.children[3].opacity = 0;
                shapeGroup.children[2].opacity = 0;
                shapeGroup.children[5].opacity = 0;
            } else {
                shapeGroup.children[3].opacity = 1;
                shapeGroup.children[2].opacity = 1;
                shapeGroup.children[5].opacity = 1;
            }
        };
    }, []);
    return (
        <canvas id="canvas" ></canvas>
    )
}

