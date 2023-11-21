import { Props, Key } from 'shared/ReactTypes';
import { WorkTag } from './workTags';

import { Flags, NoFlags } from './fiberFlags';

export class FiberNode {
	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		this.tag = tag;
		this.key = key;
		this.stateNode = null;
		this.type = null;

		// 构成树状结构
		this.return = null;
		this.sibling = null;
		this.child = null;
		this.index = 0;

		this.ref = null;

		// 作为工作单元
		this.pendingProps = pendingProps;
		this.memoriedProps = null;

		this.alternate = null;
		this.flags = NoFlags;
	}
}
