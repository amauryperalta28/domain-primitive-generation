using Wepsys.Core;

namespace RI.Novus.Core.Users;

/// <summary>
/// Represents User's DecimalSalaryMinAndMax
/// </summary>
public sealed class DecimalSalaryMinAndMax : ICoreDomainPrimitive<decimal>
{
	/// <summary>
	/// As primitive types are inlined by the compiler the coverlet tool does not catch a hit for 
	/// lines `private const decimal MinValue = 0.01M; and MaxValue.
	/// </summary>
	#pragma warning disable CA1802 //Field 'xxx' is 'readonly' but initialized with constant value. Use 'const' instead.
	private static readonly decimal MinValue = 15M;

	private static readonly decimal MaxValue = 40M;

	#pragma warning restore CA1802 //Field 'xxx' is 'readonly' but initialized with constant value. Use 'const' instead.

	/// <summary>
	/// Shortcut for constructor <see cref="DecimalSalaryMinAndMax"/>.
	/// <param name="decimalSalaryMinAndMax">Represents a decimalSalaryMinAndMax.</param>
	/// <returns>An instance of <see cref="DecimalSalaryMinAndMax"/></returns>
	/// </summary>
	public static DecimalSalaryMinAndMax From(string decimalSalaryMinAndMax) => new(decimalSalaryMinAndMax);

	private DecimalSalaryMinAndMax(decimal rawDecimalSalaryMinAndMax)
	  => Value = Arguments.Between(rawDecimalSalaryMinAndMax, MinValue, MaxValue, nameof(rawDecimalSalaryMinAndMax), "Invalid value or format for User's DecimalSalaryMinAndMax");

	/// <summary>
	/// Gets property value
	/// </summary>
	public decimal Value { get; }

}
