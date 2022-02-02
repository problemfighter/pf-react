import PFLayoutInfoData from "@pfo/pf-react/src/artifacts/data/pf-layout-info-data";
import RoleUrlMapping from "../view/role/role-url-mapping";


export default class XYZRegistry {

    public static registerPrivateUrlMappings(privateLayoutInfo: PFLayoutInfoData): PFLayoutInfoData {
        privateLayoutInfo = RoleUrlMapping.privateUrlMappings(privateLayoutInfo)
        return privateLayoutInfo;
    }

}