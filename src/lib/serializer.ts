import { ConsoleSqlOutlined } from "@ant-design/icons";
import { SquareType, WallType } from "../helpers";
import { Layout } from "../Layout";

export class Serializer {
    private static serializeRowWalls(elements: (SquareType | WallType)[]) {
            return elements.map((element) => {
            if ('className' in element) {
                return ({
                    "line-empty": "0",
                    "line-wall": "w",
                    "line-half": "h",
                })[element.className];
            } else {
                return '';
            }
        }).join('');
    }

    private static deserializeRowWalls(numWalls: number, encodedWalls: string) {
        return encodedWalls.split('').map((wall) => {
            return wall;
        });
    }

    static serializeWalls(layout: Layout) {
        return layout.layout
            .map((row) => Serializer.serializeRowWalls(row))
            .join('x');
    }

    static deserializeWalls(layoutWidth: number, wallEncoding: string[]) {
        return wallEncoding.map((rowWalls, i) => {
            const numWalls = i % 2 ? layoutWidth * 2 - 1 : layoutWidth - 1;
            return Serializer.deserializeRowWalls(numWalls, rowWalls);
        })
    }
}