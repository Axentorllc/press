// Copyright (c) 2025, Frappe and contributors
// For license information, please see license.txt

frappe.ui.form.on('Physical Backup Restoration', {
	refresh(frm) {
		[
			[__('Start'), 'execute', frm.doc.status === 'Pending'],
			[__('Force Continue'), 'force_continue', frm.doc.status === 'Failure'],
			[__('Cleanup'), 'cleanup', frm.doc.status === 'Failure'],
			[__('Force Fail'), 'force_fail', frm.doc.status === 'Running'],
		].forEach(([label, method, condition]) => {
			if (condition) {
				frm.add_custom_button(
					label,
					() => {
						frappe.confirm(
							`Are you sure you want to ${label.toLowerCase()}?`,
							() => frm.call(method).then(() => frm.refresh()),
						);
					},
					__('Actions'),
				);
			}
		});
	},
});
